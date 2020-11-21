import { Injectable } from "@angular/core";

@Injectable({ providedIn: 'root'})
export class ApiService {
    
    public static backendHost: string = "https://localhost:44374"
    constructor() {}

}