import axios from 'axios'
import Cookies from 'universal-cookie'

const cookies = new Cookies()

const deleteData = (id: string) => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/roadmaps/${id}`,
        {
          headers: {
            Authorization: `Bearer ${cookies.get('token')}`,
          },
        }
      )
      resolve(result)
    } catch (err: any) {
      reject(err.response.status)
    }
  })
}

export default deleteData
