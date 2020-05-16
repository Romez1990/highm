import { configure } from 'mobx';
import { useStaticRendering } from 'mobx-react-lite';
import 'mobx-react-lite/batchingForReactDom';

configure({ enforceActions: 'always' });
if (!process.browser) useStaticRendering(true);
