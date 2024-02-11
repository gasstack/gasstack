import { test, describe, expect } from "vitest";
import {
  arrayField,
  buildForm,
  dateField,
  datetimeField,
  numberField,
  textField,
  timeField,
} from "./form-utils";

describe("form utils", () => {
  test("form creation", () => {
    const testFormDesc = {
      name: textField(),
      age: numberField(),
      grades: arrayField(numberField()),
      birthDay: dateField(),
      birthTime: timeField(),
      now: datetimeField(),
    };

    const testForm = buildForm(testFormDesc);

    expect(testForm.fields.age).toEqual("age");
    expect(testForm.fields.birthDay).toEqual("birthDay");
    expect(testForm.fields.birthTime).toEqual("birthTime");
    expect(testForm.fields.grades).toEqual("grades");
    expect(testForm.fields.name).toEqual("name");
    expect(testForm.fields.now).toEqual("now");
  });

  test("form parsing", () => {
    const testFormDesc = {
      name: textField(),
      age: numberField(),
      grades: arrayField(numberField()),
      birthDay: dateField(),
      birthTime: timeField(),
      now: datetimeField(),
    };

    const testForm = buildForm(testFormDesc);

    const nowMs = Date.now();

    const evt: GoogleAppsScript.Addons.EventObject = {
      commonEventObject: {
        formInputs: {
          name: { "": null, stringInputs: { value: ["Mike"] } },
          age: { "": null, stringInputs: { value: ["23"] } },
          grades: { "": null, stringInputs: { value: ["2", "3", "10"] } },
          birthDay: { "": null, dateInput: { msSinceEpoch: `${nowMs}` } },
          birthTime: { "": null, timeInput: { hours: 12, minutes: 34 } },
          now: {
            "": null,
            dateTimeInput: {
              msSinceEpoch: `${nowMs}`,
              hasDate: true,
              hasTime: true,
            },
          },
        },
      } as any,
    };

    const parsed = testForm.parse(evt);

    expect(parsed.age).toEqual(23);
    expect(parsed.birthDay.msSinceEpoch).toEqual(nowMs);
    expect(parsed.birthTime).toEqual({ hours: 12, minutes: 34 });
    expect(parsed.grades).toEqual([2, 3, 10]);
    expect(parsed.name).toEqual("Mike");
    expect(parsed.now.msSinceEpoch).toEqual(nowMs);
  });

  test("form validation", () => {
    const testFormDesc = {
      name: textField(),
      age: numberField(),
      grades: arrayField(numberField()),
      birthDay: dateField(),
      birthTime: timeField(),
      now: datetimeField(),
    };

    const testForm = buildForm(testFormDesc, {
      age: (p) => (p > 30 ? ["Too old"] : undefined),
      grades: (p) =>
        p.reduce((a, v) => a + v, 0) / p.length < 6
          ? ["Insufficent"]
          : undefined,
    });

    const nowMs = Date.now();

    const evt: GoogleAppsScript.Addons.EventObject = {
      commonEventObject: {
        formInputs: {
          name: { "": null, stringInputs: { value: ["Mike"] } },
          age: { "": null, stringInputs: { value: ["23"] } },
          grades: { "": null, stringInputs: { value: ["6", "3", "10"] } },
          birthDay: { "": null, dateInput: { msSinceEpoch: `${nowMs}` } },
          birthTime: { "": null, timeInput: { hours: 12, minutes: 34 } },
          now: {
            "": null,
            dateTimeInput: {
              msSinceEpoch: `${nowMs}`,
              hasDate: true,
              hasTime: true,
            },
          },
        },
      } as any,
    };

    const parsed = testForm.parse(evt);

    let validation = testForm.validate(parsed);

    expect(validation.success).toBe(true);

    parsed.grades[0] = 1;

    validation = testForm.validate(parsed);

    expect(validation.success).toBe(false);
    expect(validation.errors.age).toBe(undefined);
    expect(validation.errors.grades[0]).toBe("Insufficent");

    parsed.age = 45;

    validation = testForm.validate(parsed);

    expect(validation.success).toBe(false);
    expect(validation.errors.age[0]).toBe("Too old");
    expect(validation.errors.grades[0]).toBe("Insufficent");
  });
});
