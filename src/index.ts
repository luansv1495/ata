import fs from 'fs';
import { ConfigModule } from './modules/config';
import { ProjectPathNotFoundError } from './error';
import { RuleModule } from './modules/rules';
import { InfoMessage, Logger } from './utils';

export const main = () => {
  Logger.info(InfoMessage.loadConfig);

  const projectPath = process.argv[2];

  if (!fs.existsSync(projectPath)) {
    new ProjectPathNotFoundError(projectPath).showError();
  } else {
    const config = ConfigModule.getConfigFile(projectPath);

    if (config) {
      RuleModule.handlerRules(projectPath, config.rules);
    }
  }
};

main();
