import { User } from '../../models';
import AuthService from '../../services/auth.service';

class LoginController {
  constructor(userModel, authService) {
    this.userModel = userModel;
    this.authService = authService;
    this.loginUser = this.loginUser.bind(this);
  }

  async loginUser(req, res) {
    const { body } = req;

    let user;
    try {
      user = await this.userModel.findOne({
        where: {
          username: body.username
        },
        raw: true
      });
    } catch (error) {
      // handle server reply corrcctly for invalid data (return a 400 bad request)
      res.sendStatus(500);
      return;
    }

    if (user && this.authService.verifyPassword(body.password, user.password)) {
      res.json({
        success: true,
        message: 'Successfully logged in',
        data: {
          token: this.authService.createToken(user)
        }
      });
      return;
    }

    res.json({
      success: false,
      message: 'Invalid login details'
    });
  }
}

const loginController = new LoginController(User, AuthService);

export default loginController;
