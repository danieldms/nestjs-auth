
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { SECRET } from 'src/config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	
	constructor(private authService: AuthService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			passReqToCallback: true,
			secretOrKey: SECRET
		});
	}

	async validate(payload: any, done){
		return done(null, payload);
	}
}