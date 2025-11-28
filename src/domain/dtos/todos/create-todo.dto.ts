export class CreateTodoDTO {
    //only the class can create objects
    private constructor(
        public readonly name: string,
        public readonly completed?: boolean
    ) { }

    public static create(object: { [key: string]: any } = {}): [string?, CreateTodoDTO?] {
        console.log(object)
        let { name, completed } = object;
        if (!name) {
            return [
                "The name property is required"
            ];
        }
        if (typeof name === "string" && name.length > 255) {
            return [
                "The name property is too long. Max 255 characters"
            ];
        }

        if (completed !== undefined) {
            if (typeof completed === "string") {
                const lower = completed.toLowerCase();
                if (lower !== "true" && lower !== "false") return ["The completed property is not a boolean value"];
                completed = lower === "true";
            }
            if (typeof completed !== "boolean") return ["The completed property must be a boolean"];
        } else {
            completed = false;
        }


        return [
            undefined,
            new CreateTodoDTO(name, completed)
        ]
    }
}