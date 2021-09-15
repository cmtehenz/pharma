import { useQuery } from 'react-query';
import api from '../api';

type User = {
  id: string,
  name: string;
  gender: string;
  birthday: string;
  pictureUrl: string;
  email: string;
  phone: string;
  nationality: string;
  street: string,
  city: string,
  state: string,
  country: string,
  postcode: number,
}

type GetUsersResponse = {
  totalCount: number;
  users: User[];
}

export async function getUsers(page: number): Promise<GetUsersResponse>{
  const results = 50
  const { data } = await api.get('/api/', {
    params: {
      page,
      results,
      nat: "br",
    }
  });

  console.log();
  const totalCount = data.info.page

  const users = await data.results.map((user) => {
    return {
      id: user.login.uuid,
      name: user.name.title + " " + user.name.first + " " + user.name.last,
      gender: user.gender,
      birthday: new Date(user.dob.date).toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      }),
      pictureUrl: user.picture.medium,
      email: user.email,
      phone: user.phone,
      nationality: user.nat,
      street: user.location.street.name + ", " + user.location.street.number,
      city: user.location.city,
      state: user.location.state,
      country: user.location.country,
      postcode: user.location.postcode,
    } 
  });

  return {
    users,
    totalCount,
  }
};

export function useUsers(page: number) {
  return useQuery(['users', page], () => getUsers(page), {
    staleTime: 1000 * 60 * 10, // 5 segundos
  })
}