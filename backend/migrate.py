from sys import path
import re
import sys

from alembic.config import main

import settings

path.append(settings.PROJECT_PATH)

if __name__ == '__main__':
    sys.argv[0] = re.sub(r'(-script\.pyw?|\.exe)?$', '', sys.argv[0])
    sys.exit(main())
