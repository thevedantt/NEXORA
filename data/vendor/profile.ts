
export interface VendorProfile {
    vendorName: string;
    initials: string;
    role: string;
    avatarUrl?: string; // Optional for now
}

export const VENDOR_PROFILE: VendorProfile = {
    vendorName: "Vedant Goods",
    initials: "VG",
    role: "Vendor Account",
    avatarUrl: "", // Empty to trigger fallback to initials
};
