import { checkValidDate } from "../../../helpers/checkValidDate";

export class UpdateTodoDto {
    private constructor(
        public readonly id: string,
        public readonly name?: string,
        public readonly completed?: boolean,
        public readonly createdAt?: Date,
    ) {
    }
    //
    public static update(object: { [key: string]: any } = {}): [string?, UpdateTodoDto?] {
        console.log('---update todo DTO:')
        console.log({ object });
        let { id, name, completed, createdAt } = object;

        if (!id) {
            return ["The id is required"];
        }

        if (typeof id !== "string") return ["The id must be a string"];

        if (typeof id === "string" && id.length < 10) {
            return ["The id is invalid"];
        }

        // must include at least 1 valid property
        if (name === undefined && completed === undefined && createdAt === undefined) {
            return ["At least one property must be provided"];
        }
        // validate name
        if (name !== undefined) {
            if (typeof name !== "string") return ["The name must be a string"];
            if (name.length < 1) return ["The name is too short. Min 1 character"];
            if (name.length > 255) return ["The name is too long. Max 255 characters"];
        }
        // validate createdAt
        if (createdAt !== undefined) {
            if (!checkValidDate(createdAt)) return ["The date format is invalid"];
            createdAt = new Date(createdAt);
        }
        // validate completed
        if (completed !== undefined) {
            if (typeof completed === "string") {
                const lower = completed.toLowerCase();
                if (lower !== "true" && lower !== "false") return ["The completed property is not a boolean value"];
                completed = lower === "true";
            }

            if (typeof completed !== "boolean") return ["The completed property must be a boolean"];

        }
        // filter undefined properties
        const dtoObject = Object.fromEntries(
            Object.entries({ id, name, completed, createdAt })
                .filter(([_, value]) => value !== undefined)
        )
        return [undefined, dtoObject as UpdateTodoDto]
    }

}