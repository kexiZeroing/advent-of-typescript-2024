# Advent of TypeScript 2024

My solution to [Advent of TypeScript 2024](https://www.adventofts.com/events/2024).

## Setup
```sh
npm init -y
npm i -D typescript @types/node type-testing

npx tsc --init
# https://www.totaltypescript.com/tsconfig-cheat-sheet

touch day-1.ts
# ignores the tsconfig.json settings
npx tsc day-1.ts --noEmit
# or compiles based on the project tsconfig.json
npx tsc
```