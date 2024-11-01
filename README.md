# Levana Packages

Shared packages for Levana development.

## Local Development

Test recent changes locally to ensure everything works as expected before publishing.

### Step 1: Build the Changes

First, build the changes:

```zsh
# Build all packages
yarn build 

# Build a specific package
yarn workspace @levana-protocol/ui build 
```

### Step 2: Update the Dependency

In the `package.json` file of your application, update the relevant dependency to point to the local file path of the package. For example, given the following folder structure:

```
- levana-packages
  - packages
    - ui
      - package.json
    - utils
      - package.json
- levana-perps
  - package.json  
```

You would change the dependency like this:

```json
{
  "dependencies": {
    "@levana-protocol/ui": "file:../levana-packages/packages/ui",
  }
}
```

### Step 3: Reinstall Packages

Finally, in the application, reinstall the packages (e.g., with `yarn install`) to apply the changes.

## Publishing Changes

We're using [Changesets](https://github.com/changesets/changesets) to manage versioning. 

When a pull request introduces changes to a package, it should include a changeset. You can create a changeset with the following command:

```zsh
yarn changeset
```

Once this pull request is merged into the main branch, Changesets will automatically create or update a dedicated publishing pull request. Feature pull requests can continue to be merged into the main branch without affecting the published version. When the publishing pull request is eventually merged, Changesets will handle versioning and deploy the relevant packages automatically.
