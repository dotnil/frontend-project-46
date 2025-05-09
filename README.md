### Hexlet tests and linter status:
[![Actions Status](https://github.com/dotnil/frontend-project-46/actions/workflows/hexlet-check.yml/badge.svg)](https://github.com/dotnil/frontend-project-46/actions)
[![Maintainability](https://api.codeclimate.com/v1/badges/e560397a047cc7672178/maintainability)](https://codeclimate.com/github/dotnil/frontend-project-46/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/e560397a047cc7672178/test_coverage)](https://codeclimate.com/github/dotnil/frontend-project-46/test_coverage)


## Вычислитель отличий

"Вычислитель отличий" (или Difference Calculator) — это CLI-утилита, сравнивающая два файла (JSON, YAML) и показывающая разницу между двумя структурами данных в удобном формате (например, "stylish", "plain", "json")

## Возможности утилиты:
- Поддержка форматов входных данных: `.json`, `.yml`, `.yaml`
- Несколько форматов вывода:
  - `stylish` (по умолчанию)
  - `plain`
  - `json`

## 🔧 Установка
Убедитесь, что у вас установлен [Node.js](https://nodejs.org/) и менеджер пакетов `npm`.

- Клонируйте репозиторий и перейдите в папку проекта.

```bash
git clone https://github.com/dotnil/frontend-project-46.git
cd frontend-project-46
```

- Установите необходимые зависимости.

```bash
make install
npm link
```

## ▶️ Использование
[![asciicast](https://asciinema.org/a/JluiP11r8KQQXU2g3iU8TcXtJ.svg)](https://asciinema.org/a/JluiP11r8KQQXU2g3iU8TcXtJ)


## 🚀 Запуск

```bash
gendiff [options] <filepath1> <filepath2>
```

Опции:

| Флаг              | Описание                             |
|-------------------|--------------------------------------|
|-f, --format [type]| формат вывода (stylish, plain, json) |
|-h, --help         | вывод справки по использованию       |

Примеры:

```bash
gendiff file1.json file2.json
gendiff -f plain file1.yaml file2.yaml
gendiff --format json file1.json file2.json
```

## 🔍 Примеры вывода

Stylish formatter output (по умолчанию)
```bash
{
  + follow: false
    setting1: Value 1
  - setting2: 200
  - setting3: true
  + setting3: {
        key: value
    }
  + setting4: blah blah
  + setting5: {
        key5: value5
    }
}
```
[![asciicast](https://asciinema.org/a/oTcXEkq2H4GKN6Pr9om7p6bgy.svg)](https://asciinema.org/a/oTcXEkq2H4GKN6Pr9om7p6bgy)

Plain formatter output

```bash
Property 'common.follow' was added with value: false
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group2' was removed
```
[![asciicast](https://asciinema.org/a/leulvvQCILBz2Wap7DnWZZgaZ.svg)](https://asciinema.org/a/leulvvQCILBz2Wap7DnWZZgaZ)

JSON formatter output

```bash
[{"group1":{"operation":"=","value":[{"baz":{"operation":"-","value":"bas"}},{"baz":{"operation":"+","value":"bars"}},{"foo":{"operation":"=","value":"bar"}},{"nest":{"operation":"-","value":{"key":"value"}}},{"nest":{"operation":"+","value":"str"}}]}}]
```
[![asciicast](https://asciinema.org/a/zsLIBkEyNkPdVw4SytPNs1y06.svg)](https://asciinema.org/a/zsLIBkEyNkPdVw4SytPNs1y06)
