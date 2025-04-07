import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function createOnlyUppercaseValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value: string = control.value;

        if (!value) {
            return {onlyUppercase: null};
        }


        const onlyUppercase = value.toUpperCase() == value;
        // console.log(`'${value}'`, `'${value.toUpperCase()}'`, onlyUppercase);

        return onlyUppercase ? null : {onlyUppercase: false};
    }
}

export function createFutureDateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {

        const value: Date = new Date(Date.parse(control.value));

        if (!value) {
            return {error: true};
        }

        const dateInFuture = value.getTime() > Date.now();
        console.log(value.getTime(), Date.now(), dateInFuture);

        return dateInFuture ? null : {error: true};
    }
}
