class AppConfig {
  public readonly serverHostname: string;
  public readonly serverPort: number;
  public readonly apiUrl: string;

  constructor() {
    this.serverHostname = "192.168.0.42";
    this.serverPort = 3001;
    console.log("process env is ", process.env);
    this.apiUrl = `http://${this.serverHostname}:${this.serverPort}` as string;
  }
}

export default new AppConfig();
