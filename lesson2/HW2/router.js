import fs from 'fs/promises';
import path from 'path';
import url from 'url';

export const resolveRoute = async (requestPath, method) => {
    const segments = requestPath.split('/').filter(Boolean);
    const baseDir = path.resolve('./routes');

    let currentPath = baseDir;
    for (const segment of segments) {
        const staticPath = path.join(currentPath, segment);
        const dynamicPath = path.join(currentPath, '[id]');

        const exists = await fileExists(path.join(staticPath, 'route.js'))
            ? staticPath
            : await fileExists(path.join(dynamicPath, 'route.js'))
                ? dynamicPath
                : null;

        if (!exists) return { status: 404 };

        currentPath = exists;
    }

    const routeFile = path.join(currentPath, 'route.js');
    const routeModule = await import(url.pathToFileURL(routeFile));

    if (!routeModule[method]) {
        return { status: 405 };
    }

    return { status: 200, handler: routeModule[method] };
}

const fileExists = async (filePath) => {
    try {
        await fs.access(filePath);
        return true;
    } catch {
        return false;
    }
}
