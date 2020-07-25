class AppConfig {
  public readonly serverHostname: string;
  public readonly serverPort: number;
  public readonly apiUrl: string;

  constructor() {
    this.serverHostname = process.env.SERVER_HOSTNAME as string;
    this.serverPort = parseInt(process.env.SERVER_PORT ?? "3001", 10);
    this.apiUrl = `http://${this.serverHostname}:${this.serverPort}/` as string;
  }
}

export default new AppConfig();
