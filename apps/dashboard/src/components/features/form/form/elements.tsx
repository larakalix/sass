import { FormElementsType } from "../types/types";
import { TextAreaElement } from "./text-area";
import { TextFieldElement } from "./fields/text/text-field";

export const Elements: FormElementsType = {
    TextField: TextFieldElement,
    TextArea: TextAreaElement,
};
