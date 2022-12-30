import { red } from 'kleur';
import fs from 'fs';
import { main } from '../../../../src';
import { RuleNameEnum } from '../../../../src/modules/rules/models';

describe('Filename pattern in folder tests', () => {
  beforeAll(() => {
    jest.spyOn(process.stdout, 'write').mockImplementationOnce(() => false);
    process.argv = ['node', 'ata', './example'];
  });

  test('should display error when exists a unexpect field', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          fakeField: ''
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Unexpected field "fakeField" in filename-pattern-in-folder rule.\n'
    );
  });

  test('should display error when folder field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "folder" is required in filename-pattern-in-folder rule.\n'
    );
  });

  test('should display error when patterns field not exists', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          folder: 'source/services'
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field "patterns" is required in filename-pattern-in-folder rule.\n'
    );
  });

  test('should display error when folder field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['*.ts'],
          folder: true
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Field folder with value "true" is not a string in filename-pattern-in-folder rule.\n'
    );
  });

  test('should display error when pattern field is invalid', () => {
    const fakeConfig = {
      rules: [
        {
          name: RuleNameEnum.filenamePatternInFolder,
          skip: false,
          patterns: ['folder'],
          folder: 'source/services'
        }
      ]
    };
    fs.writeFileSync('./example/ata.config.json', JSON.stringify(fakeConfig));

    main();

    expect(process.stdout.write).toBeCalledWith(
      red('ERROR: ') +
        'RuleError Pattern with value "folder" is not a file in filename-pattern-in-folder rule.\n'
    );
  });
});
