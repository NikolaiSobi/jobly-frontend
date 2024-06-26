import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 * There shouldn't be any frontend-specific stuff here, and there shouldn't
 * be any API-aware stuff elsewhere in the frontend.
 *
 */

class JoblyApi {
  // the token for interactive with the API will be stored here.
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    //there are multiple ways to pass an authorization token, this is how you pass it in the header.
    //this has been provided to show you another way to pass the token. you are only expected to read this code for this project.
    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get")
        ? data
        : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get details on a company by handle. */

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  /** Get all companies */
  static async getCompanies() {
    let res = await this.request(`companies`);
    return res.companies
  }

  /** Get all jobs */
  static async getJobs() {
    let res = await this.request(`jobs`);
    return res.jobs
  }
  
  /** Get all companies that meet search term */
  static async searchCompanies(searchTerm) {
    if(!searchTerm){
      let res = await this.request(`companies`)
      return res.companies
    }
    let res = await this.request(`companies?name=${searchTerm}`)
    return res.companies
  }

  /** Get all jobs that meet search term */
  static async searchJobs(searchTerm) {
    if(!searchTerm){
      let res = await this.request(`jobs`)
      return res.jobs
    }
    let res = await this.request(`jobs?title=${searchTerm}`)
    return res.jobs
  }

  static async signup(obj) {
      let res = await this.request(`auth/register`, obj, 'post')
      return res
  }
 
  static async login(obj) {
    let res = await this.request(`auth/token`, obj, 'post')
    return res
    
  }

  static async getCompany(company) {
    try {
      let res = await this.request(`companies/${company}`)
      return res
    } catch (error) {
      return error
    }
  }

  static async getUser(username) {
    let res = await this.request(`users/${username}`)
    return res
  }

  static async updateUser(username, obj) {
    let res = await this.request(`users/${username}`, obj, 'patch')
    return res
}

static async applyToJob(username, data={}, id) {
  let res = await this.request(`users/${username}/jobs/${id}`, data, 'post')
  return res
  
}
  // obviously, you'll add a lot here ...
}

// for now, put token ("testuser" / "password" on class)
JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZ" +
    "SI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0." +
    "FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";


  export default JoblyApi