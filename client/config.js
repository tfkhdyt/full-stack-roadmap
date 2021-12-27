import Swal from 'sweetalert2'

export const Alert = Swal.mixin({
  background: '#1f2937',
  color: '#e5e7eb',
  allowEnterKey: false,
  allowEscapeKey: false,
  allowOutsideClick: false
})

export default {
  header: "TFKHDYT's Full Stack Roadmap",
  title: 'Full Stack Roadmap | TFKHDYT',
  favicon: '/images/favicon.ico',
  link: 'https://roadmap.tfkhdyt.my.id',
  deskripsi:
    'Pengen jadi Full Stack Developer tapi masih bingung harus mulai dari mana?',
  thumbnail: '/images/thumbnail.jpg',
  keywords: [
    'Full Stack Developer Roadmap',
    'Full Stack',
    'Front-end',
    'Back-end',
    'Developer',
    'Programmer',
    'Roadmap',
  ],
  API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : process.env.API_URL,
  NEXT_PUBLIC_API_URL: process.env.NODE_ENV === 'development' ? 'http://localhost:4000' : process.env.NEXT_PUBLIC_API_URL,
}
