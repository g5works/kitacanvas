import { z } from "zod";
import { CanvasDomain } from "./types/oldtypes/accounttypes";
import { CourseType } from "./types/oldtypes/coursetypes";
import { Assignment, Submission } from "./types/oldtypes/assignmenttypes";

class CanvasClient {

    domain: string;
    token: string;
    name: string;
    #nextAssignmentPageURL: string;

    fetch: Function;

    constructor(domain: string, token: string, name: string, fetch: Function) {
        this.domain = domain
        this.token = token
        this.name = name
        this.fetch = fetch
        this.#nextAssignmentPageURL = ""
    }


    async #sender(endpoint: string, params?: any) {
        console.log(`https://${this.domain}/api/v1/${endpoint}?` + new URLSearchParams(params))
        let x = (await fetch(`https://${this.domain}/api/v1/${endpoint}?` + new URLSearchParams(params), {
                method: 'GET',
                headers: {
                    Authorization: this.token,
                    'Content-Type': 'application/json',
                }
        }))

        let linkheaders = x.headers.get('Link')
        console.log(linkheaders ? parsePaginationHeaders(linkheaders) : [])
        
        return {ok: x.ok, data: await x.json(), pagination: linkheaders ? parsePaginationHeaders(linkheaders) : []}
    }


    async isValidClient() {
        let x = await this.#sender("courses")
        return x.ok
    }

    async getUserCourses() {
        let x = await this.#sender('courses')
        
        console.log(x)

    }

    // async getAssignmentsForCourse(course: number) {
    //     let x = await this.#sender(`courses/${course}/assignments`)
    //     let y = x.data.filter((i: z.infer<typeof Assignment>) => {
    //         let z = Assignment.safeParse(i)
    //         if (z.success) {
    //             return z.data
    //         }
    //         else {
    //             console.log('there was an error parsing an assignment')
    //             console.log(z.error)
    //         }
    //     })


    //     return y
    // }

    // async getSubmissionsForAssignment(course: z.infer<typeof Course>, assgn: z.infer<typeof Assignment>) {
    //     let x = await this.#sender(`courses/${course.id}/assignments/${assgn.id}/submissions/self`)

    //     let z = Submission.safeParse(x.data)
    //     if (z.success) {
    //         return z.data
    //     }
        
    // }
}


export async function findInstanceByName(name: string) {

    const x = (await fetch(`https://canvas.instructure.com/api/v1/accounts/search?` + new URLSearchParams({name: name}), {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })).json()

    let obj = CanvasDomain.array().safeParse(await x)
    return obj
}

export function parsePaginationHeaders(paginationHeaders: string) {
    
    const x = paginationHeaders.split(",").map((x) => {
        let n = x.trim().split(";").map((y) => y.trim())
        return [n[0].substring(1, n[0].length-1), n[1].substring(5, n[1].length-1)]
    })

    return x
}

export default CanvasClient