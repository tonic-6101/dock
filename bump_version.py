#!/usr/bin/env python3
# SPDX-License-Identifier: AGPL-3.0-or-later
# Copyright (C) 2024-2026 Tonic

"""
Dock version bumper — updates version in all required files atomically.

Usage:
    python bump_version.py 0.4.0
    python bump_version.py patch     # 0.3.0 → 0.3.1
    python bump_version.py minor     # 0.3.0 → 0.4.0
    python bump_version.py major     # 0.3.0 → 1.0.0
"""

import json
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent

# All files that contain the version string and how to update them
VERSION_FILES = [
    {
        "path": ROOT / "VERSION",
        "pattern": r"^\d+\.\d+\.\d+",
        "replacement": "{version}",
    },
    {
        "path": ROOT / "dock" / "__init__.py",
        "pattern": r'__version__\s*=\s*"[^"]+"',
        "replacement": '__version__ = "{version}"',
    },
    {
        "path": ROOT / "frontend" / "package.json",
        "type": "json",
        "key": "version",
    },
    {
        "path": ROOT / "README.md",
        "pattern": r"version-\d+\.\d+\.\d+-blue",
        "replacement": "version-{version}-blue",
    },
]


def read_current_version() -> str:
    return (ROOT / "VERSION").read_text().strip()


def parse_version(v: str) -> tuple[int, int, int]:
    parts = v.split(".")
    if len(parts) != 3 or not all(p.isdigit() for p in parts):
        raise ValueError(f"Invalid semver: {v}")
    return int(parts[0]), int(parts[1]), int(parts[2])


def bump(current: str, level: str) -> str:
    major, minor, patch = parse_version(current)
    if level == "patch":
        return f"{major}.{minor}.{patch + 1}"
    if level == "minor":
        return f"{major}.{minor + 1}.0"
    if level == "major":
        return f"{major + 1}.0.0"
    raise ValueError(f"Unknown bump level: {level}")


def update_file(entry: dict, version: str) -> bool:
    path: Path = entry["path"]
    if not path.exists():
        print(f"  SKIP  {path.relative_to(ROOT)} (not found)")
        return False

    if entry.get("type") == "json":
        data = json.loads(path.read_text())
        old = data.get(entry["key"])
        data[entry["key"]] = version
        path.write_text(json.dumps(data, indent=2) + "\n")
        print(f"  OK    {path.relative_to(ROOT)}  {old} → {version}")
        return True

    content = path.read_text()
    pattern = entry["pattern"]
    replacement = entry["replacement"].format(version=version)
    new_content, count = re.subn(pattern, replacement, content, count=1)
    if count == 0:
        print(f"  WARN  {path.relative_to(ROOT)} — pattern not matched: {pattern}")
        return False
    path.write_text(new_content)
    print(f"  OK    {path.relative_to(ROOT)}")
    return True


def main():
    if len(sys.argv) != 2:
        print(__doc__.strip())
        sys.exit(1)

    arg = sys.argv[1]
    current = read_current_version()

    if arg in ("patch", "minor", "major"):
        new_version = bump(current, arg)
    else:
        # Validate explicit version
        parse_version(arg)
        new_version = arg

    if new_version == current:
        print(f"Already at {current}")
        sys.exit(0)

    print(f"\nBumping {current} → {new_version}\n")

    success = 0
    for entry in VERSION_FILES:
        if update_file(entry, new_version):
            success += 1

    print(f"\n✓ Updated {success}/{len(VERSION_FILES)} files to {new_version}")
    print(f"\nNext steps:")
    print(f"  git add -p && git commit -m 'chore: bump version to {new_version}'")


if __name__ == "__main__":
    main()
