import { PassportStatic } from 'passport';
import {
  Strategy as GoogleStrategy,
  Profile as GoogleProfile,
  VerifyCallback,
} from 'passport-google-oauth20';
import {
  Strategy as GithubStrategy,
  Profile as GithubProfile,
} from 'passport-github2';
import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from 'passport-jwt';
import { config } from 'dotenv';
import { LoginWithGithub, LoginWithGoogle } from '../helpers/socialLogin';
import { getUserById } from '../helpers/data';

config();

// console.log('🔍 DEBUG ENV LOADING:');
// console.log('GOOGLE_CLIENT_ID:', process.env.GOOGLE_CLIENT_ID);
// console.log('GOOGLE_CLIENT_SECRET:', process.env.GOOGLE_CLIENT_SECRET);
// console.log('GOOGLE_CALLBACK_URL:', process.env.GOOGLE_CALLBACK_URL);
// console.log('GITHUB_CLIENT_ID:', process.env.GITHUB_CLIENT_ID);
// console.log('GITHUB_CLIENT_SECRET:', process.env.GITHUB_CLIENT_SECRET);
// console.log('GITHUB_CALLBACK_URL:', process.env.GITHUB_CALLBACK_URL);
// console.log('ACCESS_JWT_SECRET:', process.env.ACCESS_JWT_SECRET);

const GoogleProvider = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID as string,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
    scope: ['profile', 'email'],
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: GoogleProfile,
    done
  ) {
    await LoginWithGoogle(profile, done);
  }
);

const GithubProvider = new GithubStrategy(
  {
    clientID: process.env.GITHUB_CLIENT_ID as string,
    clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    callbackURL: process.env.GITHUB_CALLBACK_URL as string,
    scope: ['user:email', 'user:profile'],
  },
  async function (
    accessToken: string,
    refreshToken: string,
    profile: GithubProfile,
    done: VerifyCallback
  ) {
    await LoginWithGithub(profile, done);
  }
);

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.ACCESS_JWT_SECRET as string,
};

const JWTProvider = new JwtStrategy(options, async (jwt_payload, done) => {
  try {
    const user = await getUserById(jwt_payload.id);
    if (!user) return done(null, false);
    return done(null, user);
  } catch (error) {
    return done(error, false);
  }
});

export default (passport: PassportStatic) => {
  passport.use(GoogleProvider);
  passport.use(GithubProvider);
  passport.use(JWTProvider);
};
