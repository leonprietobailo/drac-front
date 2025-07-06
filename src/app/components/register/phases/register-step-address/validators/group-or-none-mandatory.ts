import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const requiredGroupIfAnyFilled: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const streetNumber = control.get('streetNumber')?.value;
  const postalCode = control.get('postalCode')?.value;
  const city = control.get('city')?.value;
  const province = control.get('province')?.value;

  console.log('streetNumber:', streetNumber);
  console.log('postalCode:', postalCode);
  console.log('city:', city);
  console.log('province:', province);

  console.log(control.get('streetNumber')?.touched);

  const errors: ValidationErrors = {};

  if (streetNumber || postalCode || city || province) {
    if (streetNumber === undefined || streetNumber === '') {
      errors['inconsistentStreetNumber'] = true;
    }

    if (postalCode === undefined || postalCode === '') {
      errors['inconsistentPostalCode'] = true;
    }

    if (city === undefined || city === '') {
      errors['inconsistentCity'] = true;
    }

    if (province === undefined || province === '') {
      errors['inconsistentProvince'] = true;
    }

    return Object.keys(errors).length > 0 ? errors : null;
  }

  return null;
};
