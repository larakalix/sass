import { CheckboxFieldFormElement } from "../form/fields/checkbox/checkbox-field";
import { DateFieldFormElement } from "../form/fields/date/date-field";
import { NumberFieldFormElement } from "../form/fields/number/number-field";
import { ParagprahFieldFormElement } from "../form/fields/paragraph/paragraph-field";
import { SelectFieldFormElement } from "../form/fields/select/select-field";
import { SeparatorFieldFormElement } from "../form/fields/separator/separator-field";
import { SpacerFieldFormElement } from "../form/fields/spacer/spacer-field";
import { SubTitleFieldFormElement } from "../form/fields/subtitle/subtitle-field";
import { TextFieldFormElement } from "../form/fields/text/text-field";
import { TextAreaFormElement } from "../form/fields/textarea/textarea-field";
import { TitleFieldFormElement } from "../form/fields/title/title-field";

export type ElementsType =
    | "TextField"
    | "TitleField"
    | "SubTitleField"
    | "ParagraphField"
    | "SeparatorField"
    | "SpacerField"
    | "NumberField"
    | "TextAreaField"
    | "DateField"
    | "SelectField"
    | "CheckboxField";

export type SubmitFunction = (key: string, value: string) => void;

export type FormElement = {
    type: ElementsType;
    construct: (id: string) => FormElementInstance;
    designerBtnElement: {
        icon: React.ElementType;
        label: string;
    };
    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
        isInvalid?: boolean;
        defaultValue?: string;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    validate: (
        formElement: FormElementInstance,
        currentValue: string
    ) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, any>;
};

type FormElementsType = {
    [key in ElementsType]: FormElement;
};

export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagprahFieldFormElement,
    SeparatorField: SeparatorFieldFormElement,
    SpacerField: SpacerFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
};
