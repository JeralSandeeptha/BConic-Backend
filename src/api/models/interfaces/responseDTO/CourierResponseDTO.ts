export interface CourierResponseDTO {
    courier_id: number;
    trackingNumber: string;
    user_id: string;
    senderName: string;
    senderAddress: string;
    mobile: string;
    recepientName: string;
    recepientAddress: string;
    additionalInfo?: string;
    status: string;
    created_at: Date;
    updated_at: Date;
}