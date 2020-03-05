const request = require('supertest');
const app = require('../app');

describe('Post Endpoints', () => {
  it('should redirect to districts route', async () => {
    const res = await request(app).get('/api/v1');
    expect(res.statusCode).toEqual(302);
    expect(res.header.location).toEqual('/api/v1/districts');
  });

  it('should list the Pharmacies on Duty in Kadıköy', async () => {
    const res = await request(app)
      .post('/api/v1/pharmacies')
      .send({
        district: 'Kadıköy',
      });
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('pharmacies');
  });

  it('should list the Districts of Istanbul', async () => {
    const res = await request(app).get('/api/v1/districts');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('districts');
  });

  it('should respond with status code 500 if invalid district is entered', async () => {
    const res = await request(app)
      .post('/api/v1/pharmacies')
      .send({
        district: 'Çankaya',
      });
    expect(res.statusCode).toEqual(500);
    expect(res.body).toHaveProperty('error');
  });
});
