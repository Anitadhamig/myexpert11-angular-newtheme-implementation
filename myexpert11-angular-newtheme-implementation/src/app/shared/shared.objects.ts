
export class RegisterData {
    accountType: string;
    first_name: string;
    last_name: string;
    state: string;
    city: string;
    pincode: number;
    email: string;
    phoneNumber: number;
    password: string;
}

export class LoginData {
    email: string;
    password: string;
}

export class UserData extends RegisterData {
    _id: string;
    active: boolean;
    newUserToken: string;
    provider: string;
    role: string;
    isCompany: boolean;
}

export class CompanyData {
    coName: string;
    coEmail: string;
    coNumber: number;
    coOwner: string;
    coAddress: string;
    coAbout: string;
    coLogo: string;
    coUrl: string;
}

export class CompanyDetail extends CompanyData {
    _id: string;
    uid: string;
    nameLower: string;
    slug: string;
    createdAt: Date;
    updatedAt: Date;
}

export class AddCategory {
    constructor() {
        this.subCategories = new Array<string>();
    }
    name: string;
    info: string;
    image: String;
    subCategories: Array<string>;
    parentCategory: number;
    categoryType: number;
}

export class Category {
    _id: string;
    name: string;
    selectedSubCategory: string;
    parentCategory: number;
    createdAt: Date;
    updatedAt: Date;
}

export class CategoryDetail extends Category {
    constructor() {
        super();
        this.subCategories = new Array<string>();
    }
    info: string;
    categoryType: number;
    subCategories: Array<string>;
    active: boolean;
}



export class Variant {
    key: string;
    value: string;
}

export class Product {
    constructor() {
        this.category = new Category;
        this.variants = Array<Variant>();
        this.tag = Array<string>();
    }
    uid: string;
    ueid: string;
    name: string;
    brand: string;
    category: Category;
    price: number;
    mrp: number;
    unit: string;
    minQuantity: string;
    info: string;
    variants: Array<Variant>;
    available_at: string;
    tag: Array<string>;
}

export class AddProduct {
    constructor() {
        this.productData = new Product;
        this.thumbnailData = new Array<string>();
    }
    productData: Product;
    imageData: string;
    thumbnailData: Array<string>;
}

export class ProductDetail extends Product {
    constructor() {
        super();
        this.cid = new CompanyDetail;
        this.proThumbnails = new Array<string>();
    }
    _id: string;
    cid: CompanyDetail;
    blockReason: string;
    isBlock: boolean;
    inStock: boolean;
    active: boolean;
    proImg: string;
    proThumbnails: Array<string>;
    createdAt: Date;
    updatedAt: Date;
    showAtHome: boolean;
}

export class QuoteData {
    constructor() {
        this.pCat = new Category;
    }
    pid: string;
    pName: string;
    pCat: Category;
    pQuantity: number;
    pUnit: string;
    pInfo: string;
    cid: string;
    sid: string;
    bid: string;
    bName: string;
    bContact: number;
    bEmail: string;
}

export class QuoteDetail {
    constructor() {
        this.pid = new ProductDetail;
        this.pCat = new Category;
    }
    pid: ProductDetail;
    pName: string;
    pCat: Category;
    pQuantity: number;
    // pUnit: string;
    pInfo: string;
    cid: string;
    sid: string;
    // bid: string;
    bName: string;
    bContact: number;
    bEmail: string;
}

export class Blog {
    title: string;
    content: string;
    image = [{ url: '' }]
}

export class BlogDetail extends Blog {
    constructor() {
        super();
        this.userId = new UserData;
    }
    _id: string;
    active: boolean;
    createdAt: Date;
    updatedAt: Date;
    userId: UserData;

}

export class ResetPassword {
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
}