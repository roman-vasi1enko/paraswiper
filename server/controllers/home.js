import { fileURLToPath } from 'url';
import path from 'path';

export function getIndex(req, res) {
    const __dirname = path.dirname(fileURLToPath(import.meta.url));
    let buildPath = path.join(__dirname, '../../client/build');
    res.sendFile(path.join(buildPath, 'index.html'));
}