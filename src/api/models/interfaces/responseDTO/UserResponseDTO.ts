export interface UserResponseDTO {
    user_id: number;
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    address: string;
    mobile: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}