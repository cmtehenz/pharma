import { useQuery } from 'react-query';
import api from '../api';

type User = {
  id: string,
  name: string;
  gender: string;
  birthday: string;
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
      })
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