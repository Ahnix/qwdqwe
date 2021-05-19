import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dock',
  connector: 'mysql',
  url: 'mysql://root:root@localhost/dock',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'dock'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DockDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dock';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dock', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
