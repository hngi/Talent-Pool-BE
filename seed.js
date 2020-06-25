const bcrypt = require('bcryptjs');
const inquirer = require('inquirer');
const { uuid } = require('uuidv4');
const chalk = require('chalk');
const model = require('./models/index');

const confirmPasswordInput = async (input) => {
  if (input.length < 8) {
    return 'Password must be at least 8 characters long';
  }
  return true;
};

const seedSuperAdmin = async () => {
  const rolesExists = await model.Role.findOne({
    where: { role_id: 'ROL-SUPERADMIN-SPA389y32fh' },
  });
  if (rolesExists) {
    const logInit = chalk.green('[✔] Super admin already initialized');
    // eslint-disable-next-line no-console
    console.log(logInit);
    return;
  }
  const logInit = chalk.yellowBright('[!] Initializing Super Admin!');
  // eslint-disable-next-line no-console
  console.log(logInit);
  const rolesCreated = await model.Role.bulkCreate([
    { role_name: 'super_admin', role_id: 'ROL-SUPERADMIN-SPA389y32fh' },
    { role_name: 'admin', role_id: 'ROL-ADMIN-adio3092ru22' },
    { role_name: 'employer', role_id: 'ROL-EMPLOYER-8hhfbhf' },
    { role_name: 'employee', role_id: 'ROL-EMPLOYEE-EM8hu7' },
  ]);
  if (rolesCreated) {
    const userExists = await model.User.findOne({
      where: { role_id: 'ROL-SUPERADMIN-SPA389y32fh' },
    });
    if (userExists) return;

    inquirer
      .prompt([
        {
          name: 'first_name',
          message: 'First Name (default: admin)',
          default: 'admin',
        },
        {
          name: 'last_name',
          message: 'Last Name (default: admin)',
          default: 'admin',
        },
        {
          type: 'password',
          name: 'password',
          message: 'password (default: admin)',
          mask: '*',
          validate: confirmPasswordInput,
        },
        {
          name: 'email',
          message: 'email (default: email@example.com)',
          default: 'email@example.com',
        },
        {
          name: 'phone_no',
          type: 'input',
          message: 'Phone Number',
        },
      ])
      .then(async (answers) => {
        // hash password
        const salt = bcrypt.genSaltSync(10);
        // eslint-disable-next-line no-param-reassign
        answers.password = await bcrypt.hashSync(answers.password, salt);
        await model.User.create({
          ...answers,
          user_id: uuid(),
          role_id: 'ROL-SUPERADMIN-SPA389y32fh',
          verification_token: 'super-admin',
          status: '1',
        });
        const log = chalk.green('[✔] Super admin created successfully');
        // eslint-disable-next-line no-console
        console.log(log);
      });
  }
};

module.exports.seedSuperAdmin = seedSuperAdmin;
