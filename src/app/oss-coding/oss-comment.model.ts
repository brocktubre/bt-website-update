import { environment } from 'src/environments/environment';

export class OssCommentModel {
  public id: number;
  public body: string;
  public created_at: string;
  public html_url: string;
  public issue_url: string;
  public url: string;
  public user_id: string;
  public user_login: string;
  public user_type: string;
  public author_association: string;
  public is_newcomer_comment: string;
  public repo: string;
  public has_been_coded: boolean;
  public selectedCodes: Array<OssCodeBookModel> = new Array<OssCodeBookModel>();
  public accessName: string;
}

export class OssCodeBookModel {
  public item_id: number;
  public item_text: string;
}

export class OssUserModel {
  public users = new Array<string>();

  constructor() {
    this.users.push(environment.ossCoding.users.james);
    this.users.push(environment.ossCoding.users.brock);
    this.users.push(environment.ossCoding.users.igors);
    this.users.push(environment.ossCoding.users.igorw);
    this.users.push(environment.ossCoding.users.millon);
    this.users.push(environment.ossCoding.users.paige);
  }

  public translateAccessCode(accessCode: string) {
      if(accessCode === environment.ossCoding.users.brock) {
        return 'brock'
      } else if(accessCode === environment.ossCoding.users.james) {
        return 'james'
      } else if(accessCode === environment.ossCoding.users.paige) {
        return 'paige'
      } else if(accessCode === environment.ossCoding.users.millon) {
        return 'millon'
      } else if(accessCode === environment.ossCoding.users.igors) {
        return 'igors'
      } else if(accessCode === environment.ossCoding.users.igorw) {
        return 'igorw'
      }
  }
}
