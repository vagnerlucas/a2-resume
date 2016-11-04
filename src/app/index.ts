// App
export * from './app.component';
export * from './app.service';
export * from './app.routes';
//export * from './cmd.service';

import { Command } from './app.service';
import { Writer } from './common-services/writer.service';

// Application wide providers
export const APP_PROVIDERS = [
  Command,
  Writer
];
