## 1.9.0

### Feature
* **Directory structure support**: `(ngxf-select) (ngxf-drop)` support directory structure.

```ts
  /**
   * the structure of output result
   * @default 'files'
   */
  structure: 'directory' | 'files';
```


## 1.8.0

### Feature
* **Folder support**: `(ngxf-select)` support select folder mode.
* **Folder support**: `(ngxf-drop)` support drag folder into **(not work in IE)**.

This folder upload feature, thanks for [SHANG-TING](https://github.com/SHANG-TING), more detail about file upload with folder, can view his [blog](https://scullyio-blog.gofa.cloud/blog/recursive_file_uploader/)


## 1.7.1

### Bug fix
* **console.log**: remove console.log in mistake.

## 1.7.0

### Feature
* **Parse**: Support new parse directive for parse files.

### Fix
* **All code upgrade to angular 11**: upgrade package way with angular 11.2

## 1.6.0

### But Fix
* **Support Blob with file**: Add Blob file type check
* **Field order change**: Change field order before the file


## 1.5.3

* **Bug fix** fix bug with ng-packgr issue [cb9f471](https://github.com/ZouYouShun/ngxf-uploader/commit/cb9f471327b094e342d51f96f58374ff60a0a49c).

## 1.5.2

* **Add upload options** add `responseType` and `withCredentials` with upload options.

* **Code optimization** Optimizate functions with check file size and type, make code more readable.

## 1.5.1

### Fix problem with IE

* **Append upload input elm on body:** IE need actual element on document, that can occur upload change event.

* **Change peerDependencies to more than 6.0.0:** Change peerDependencies to more than 6.0.0

## 1.5.0

### Refactory upload with Renderer

* Refactory upload with Renderer2 to add class and style
* **add skipInvalid to FileOption:** now you can use skipInvalid to ignore invalid file.

## 1.4.0

### Upgrade to Angular 6+ Rxjs 6+

* Upgrade to Angular 6+ Rxjs 6+

## 1.3.0

### Upgrade

* Beacuse big change with package way, so direct jump to 1.3.0, 
* API don't has BREAK CHANGE, just only add UploadEvent type to NgxfUploaderService. :)

## 1.2.7

### Bug fix

* **NgxfUploaderService fix type to `Observable<UploadEvent>`**

## 1.2.6

### Upgrade

* **upgrade to rxjs 5.5.7**
* **deprecated previous version**
