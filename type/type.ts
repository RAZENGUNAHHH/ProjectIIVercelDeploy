export type Course_type = {
    name: string,
    instructor: string,
    detail: string,
    img_src: string,
    st_date: Date,
    en_date: Date,
    st_enrol: Date,
    en_enrol: Date,
    limited: number
    category : 'engineer' | 'genius',
}

export enum Course_tag {
    name = 'name',
    instructor = 'instructor',
    detail = 'detail',
    img_src = 'img_src',
    st_date = 'st_date',
    en_date = 'en_date',
    st_enrol = 'st_enrol',
    en_enrol = 'en_enrol',
    limited = 'limited',
    category = 'category',

}

export type Course_table = {
    _id: string,
    name: string,
    instructor: string,
    detail: string,
    img_src: string,
    st_date: Date,
    en_date: Date,
    st_enrol: Date,
    en_enrol: Date,
    limited: number,
    status: string,
    members: member_type[],
    enrolNumber?: string
    category : 'engineer' | 'genius',
}


export type member_type = {
        _id : string
        student_id : string,
        name : string,
        certificate: string,
        ac_year: number
}
export type ColorStatus = {
    [key: string]: string;
}

export const colorStatus: ColorStatus = {
    "ช่วงลงทะเบียน": '#f1c232',
    "กำลังดำเนินการ": '#6aa84f',
    "เสร็จสิ้นแล้ว": '#f44336',
    "ลงทะเบียนเร็วๆนี้": '#A4A4A4',
    "จะเริ่มในอีก....": "#0249B1"
}

export type user_profile_type = {
    name : string,
    email : string,
    id : string,
    student_id : number,
    sur_n : string,
    ac_y : number,
    role : string

}

export type user_enrol = {
    name : string,
    instructor : string,
    st_date : Date,
    en_date : Date,
    detail : string
    certificate : boolean
    category : string
}


export type map_data = {
        num : number,
        msg : string,
        detail: string
}