import { readFileSync } from 'node:fs';
import assert from 'node:assert/strict';
import { runInNewContext } from 'node:vm';
import { test } from 'node:test';

const root = readFileSync(new URL('../dist/index.html', import.meta.url), 'utf8');
const redirect = [...root.matchAll(/<script\b[^>]*>([\s\S]*?)<\/script>/g)]
  .map((match) => match[1]).find((script) => script.includes('location.replace'));

test('entry page selects the first supported browser language and preserves URL context', () => {
  for (const [languages, expected] of [
    [['es-AR'], 'es'], [['EN-us'], 'en'], [['pt-BR'], 'pt-br'],
    [['pt-PT'], 'pt-br'], [['de-DE', 'es-MX', 'en'], 'es'],
    [['en-GB', 'es'], 'en'], [['ja', 'fr'], 'en'], [[], 'en'],
  ]) {
    let destination;
    runInNewContext(redirect, {
      navigator: { languages },
      location: { search: '?ref=test', hash: '#proyectos', replace: (url) => { destination = url; } },
    });
    assert.equal(destination, `/${expected}/?ref=test#proyectos`);
  }
});

test('navigator.language supports browsers without a language list', () => {
  let destination;
  runInNewContext(redirect, {
    navigator: { language: 'es-ES' },
    location: { search: '', hash: '', replace: (url) => { destination = url; } },
  });
  assert.equal(destination, '/es/');
});

test('localized pages have translated content, metadata and stable direct links', () => {
  for (const [locale, tag, greeting] of [['en', 'en', 'Hi, I’m'], ['es', 'es', 'Hola, soy'], ['pt-br', 'pt-BR', 'Olá, sou']]) {
    const html = readFileSync(new URL(`../dist/${locale}/index.html`, import.meta.url), 'utf8');
    assert.ok(html.includes(`lang="${tag}"`));
    assert.ok(html.includes(greeting));
    assert.ok(html.includes(`rel="canonical" href="https://onidevti.dev/${locale}/"`));
    assert.ok(!html.includes('location.replace'));
    for (const target of ['en', 'es', 'pt-br']) assert.ok(html.includes(`href="/${target}/"`));
    const dictionary = JSON.parse(readFileSync(new URL(`../src/i18n/${locale}.json`, import.meta.url)));
    assert.equal(dictionary.projects.length, 10);
    assert.equal(dictionary.experience.length, 5);
    for (const project of dictionary.projects) assert.ok(html.includes(project.description.replaceAll('&', '&amp;')));
  }
  assert.ok(root.includes('Hi, I’m'), 'English remains available when JavaScript is disabled');
});
