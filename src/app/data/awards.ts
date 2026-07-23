import saberProImg from '../../images/Saber_Pro_Top1.jpeg';
import hackathonImg from '../../images/Hackathon_Winner.jpeg';
import cloudEssentialsImg from '../../images/Cloud_Essentials.JPG';
import cloudPractitionerImg from '../../images/Cloud_Practitioner.JPG';
import claudeCodeImg from '../../images/Claude_Code.JPG';
import mcpImg from '../../images/MCP.JPG';
import javaSpecImg from '../../images/Java_Specialization.png';
import frontEndSpecImg from '../../images/FrontEnd_Specialization.png';

export interface Award {
  title: string;
  sub: string;
  image: string;
}

export const awards: Award[] = [
  { title: 'Top 1% Country Level', sub: 'Saber Pro Exam', image: saberProImg },
  { title: 'Hackathon Winner', sub: 'Talento Tech MINTIC', image: hackathonImg },
  { title: 'AWS Cloud Essentials', sub: 'AWS Training Badge', image: cloudEssentialsImg },
  { title: 'AWS Cloud Practitioner', sub: 'AWS Training Badge', image: cloudPractitionerImg },
  { title: 'Claude Code', sub: 'From Anthropic', image: claudeCodeImg },
  { title: 'MCP', sub: 'From Anthropic', image: mcpImg },
  { title: 'Java Specialization', sub: '222h EPAM Course', image: javaSpecImg },
  { title: 'Front-End Specialization', sub: '145h EPAM Course', image: frontEndSpecImg },
];
