import { MockRequest } from '../app/packages/mock';

const list = [];
const total = 50;

for (let i = 0; i < total; i += 1) {
  list.push({
    id: i + 1,
    disabled: i % 6 === 0,
    href: 'https://localhost',
    avatar: [
      'https://gw.alipayobjects.com/zos/rmsportal/eeHMaZBwmTvLdIwMfBpg.png',
      'https://gw.alipayobjects.com/zos/rmsportal/udxAbMEhpwthVVcjLXik.png',
    ][i % 2],
    no: `TradeCode ${i}`,
    title: `task name ${i}`,
    owner: 'Some User Name',
    description: 'This is a description',
    callNo: Math.floor(Math.random() * 1000),
    status: Math.floor(Math.random() * 10) % 4,
    updatedAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    createdAt: new Date(`2018-07-${Math.floor(i / 2) + 1}`),
    progress: Math.ceil(Math.random() * 100),
  });
}

function genData(params: any) {
  return {
    status: 'OK',
    response: {
      data: list
    }
  };
}

function saveData(id: number, value: any) {
  const item = list.find(w => w.id === id);
  if (!item) {
    return { msg: 'Invalid user data' };
  }
  Object.assign(item, value);
  return { msg: 'ok' };
}

export const USERS = {
  'GET /user': (req: MockRequest) => genData(req.queryString),
  'GET /user/:id': (req: MockRequest) => list.find(w => w.id === +req.params.id),
  'POST /user/:id': (req: MockRequest) => saveData(+req.params.id, req.body),
};
