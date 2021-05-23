class AppConfig {
  public readonly serverHostname: string;
  public readonly serverPort: number;
  public readonly apiUrl: string;
  public readonly s3Hostname: string;

  constructor() {
    // this.serverHostname = "192.168.0.42";
    this.serverHostname = "52.63.9.236";
    this.serverPort = 3001;
    this.s3Hostname = "https://d3hd0ynhvivxt6.cloudfront.net";
    console.log("process env is ", process.env);
    // this.apiUrl = `http://${this.serverHostname}:${this.serverPort}` as string;
    this.apiUrl = `http://${this.serverHostname}/ws` as string;
  }
}

export default new AppConfig();
