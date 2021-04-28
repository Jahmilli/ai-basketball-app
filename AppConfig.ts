class AppConfig {
  public readonly serverHostname: string;
  public readonly serverPort: number;
  public readonly apiUrl: string;
  public readonly s3Hostname: string;

  constructor() {
    this.serverHostname = "192.168.50.175";
    this.serverPort = 19000;
    this.s3Hostname = "https://d3hd0ynhvivxt6.cloudfront.net";
    console.log("process env is ", process.env);
    this.apiUrl = `http://${this.serverHostname}:${this.serverPort}` as string;
  }
}

export default new AppConfig();
