import { User } from '../models'
import { Request } from "zeromq"

export const loginUser = async ({ username, password }: { username: string, password: string }) => {
    const sock = new Request

    sock.connect("tcp://localhost:5555");
    const request = {
        type: 'login_user',
        params: {
            username,
            password,
        }
    }

    await sock.send(JSON.stringify(request))
    const [result] = await sock.receive()

    console.log(result)

}