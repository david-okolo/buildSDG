import { User } from '../../models';
import AuthService from '../../services/auth.service';

class RegisterController {
  constructor(userModel, authService) {
    this.userModel = userModel;
    this.authService = authService;
    this.registerUser = this.registerUser.bind(this);
  }

  async registerUser(req, res) {
    const { body } = req;

    if (
      !this.authService.isValidUsername(body.username)
      || !this.authService.isValidPassword(body.password)
    ) {
      res.sendStatus(400);
      return;
    }

    const user = {
      ...body,
      password: this.authService.hashPassword(body.password)
    };

    try {
      await this.userModel.create(user);
    } catch (error) {
      res.sendStatus(500);
      return;
    }

    res.json({
      success: true,
      message: 'Successfully Registered'
    });
  }
}

const registerController = new RegisterController(User, AuthService);

export default registerController;
