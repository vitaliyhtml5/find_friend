///<reference types="Cypress"/>
describe('Show all friends in app', () => {
    before(() => cy.fixture('user_data').then(data => globalThis.data = data));

    beforeEach(() => {
        cy.getToken();
        cy.visit('/');
    });

    it('User gets all friends in show all tab', () => {
        cy.request({
        method: 'GET',
        url: 'http://127.0.0.1:3000/show_users'
        })
        .then(res => {
            const data = [];
            let dataArr = [];
            for (let i in res.body) {
                let temp = Object.values(res.body[i]);
                dataArr.push(temp[1],temp[2],temp[3]);
            }
            cy.contains('button', 'Show all friends').click();
            cy.get('.table-wrap td').each((el,index) => {
                data.push(el.text());
            }).then(() => {
                for (let i = 0; i < data.length; i++) {
                    expect(data[i]).eq(String(dataArr[i]));
                }
            });
        });
    });
});