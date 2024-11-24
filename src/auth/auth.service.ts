import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from 'src/user/schema/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<UserDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { email, _id } = user.toObject();
      return { email: email, userId: _id };
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async googleLogin(req: any) {
    if (!req.user) {
      throw new Error('Google login failed: No user information');
    }

    const { email, name, picture, googleId } = req.user;
    let user = await this.userModel.findOne({ email });
    console.log('🚀 ~ AuthService  ~ user:', user);
    if (!user) {
      user = new this.userModel({
        email,
        name,
        picture,
        googleId,
      });
      await user.save();
    }

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
