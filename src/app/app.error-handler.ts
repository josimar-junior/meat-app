import { Response } from "@angular/http";

import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/throw';

export class ErrorHandler {

    static errorHandler(error: Response | any) {
        let errorMessage: string;

        errorMessage = error instanceof Response ? `Error ${error.status} when accessing URL ${error.url} - ${error.statusText}` : error.tostring();

        console.log(errorMessage);
        return Observable.throw(errorMessage);
    }
}