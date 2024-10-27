# @peralva/validate-cpf-cnpj

Validate CPF and CNPJ

[![NPM Version](https://img.shields.io/npm/v/%40peralva%2Fvalidate-cpf-cnpj)](https://www.npmjs.com/package/@peralva/validate-cpf-cnpj?activeTab=versions)
[![GitHub Release Date](https://img.shields.io/github/release-date/peralva/validate-cpf-cnpj)](https://github.com/peralva/validate-cpf-cnpj/releases)
[![GitHub License](https://img.shields.io/github/license/peralva/validate-cpf-cnpj)](https://github.com/peralva/validate-cpf-cnpj?tab=MIT-1-ov-file#readme)
[![NPM Downloads](https://img.shields.io/npm/dm/%40peralva%2Fvalidate-cpf-cnpj)](https://www.npmjs.com/package/@peralva/validate-cpf-cnpj)
[![NPM Publish](https://github.com/peralva/validate-cpf-cnpj/actions/workflows/npm-publish.yml/badge.svg)](https://github.com/peralva/validate-cpf-cnpj/actions/workflows/npm-publish.yml)

## Installation

```bash
npm install @peralva/validate-cpf-cnpj
```

## Usage

```ts
import { validateCpfCnpj } from '@peralva/validate-cpf-cnpj';

const cpfCnpj = validateCpfCnpj('123 456 789 09');

console.log(cpfCnpj.data, cpfCnpj.masked);
```
