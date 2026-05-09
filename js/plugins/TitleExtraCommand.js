/*:
 * @plugindesc タイトル画面に「クレジット」「作者URL」を追加
 * @author ChatGPT
 *
 * @param AuthorUrl
 * @text 作者URL
 * @type string
 * @default https://example.com/
 *
 * @param CreditMapId
 * @text クレジット用マップID
 * @type number
 * @default 1
 *
 * @help
 * タイトル画面に
 * ・クレジット
 * ・作者URL
 * を追加します。
 *
 * 「クレジット」は指定したマップへ移動します。
 */

(function() {

    var parameters = PluginManager.parameters('TitleExtraCommand');

    var authorUrl = String(parameters['AuthorUrl'] || '');
    var creditMapId = Number(parameters['CreditMapId'] || 1);

    //==================================================
    // コマンド追加
    //==================================================

    var _Window_TitleCommand_makeCommandList =
        Window_TitleCommand.prototype.makeCommandList;

    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);

        this.addCommand('クレジット', 'credits');
        this.addCommand('「異世界アジャイル」とは？', 'authorUrl');
    };

    //==================================================
    // コマンド登録
    //==================================================

    var _Scene_Title_createCommandWindow =
        Scene_Title.prototype.createCommandWindow;

    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);

        this._commandWindow.setHandler(
            'credits',
            this.commandCredits.bind(this)
        );

        this._commandWindow.setHandler(
            'authorUrl',
            this.commandAuthorUrl.bind(this)
        );
    };

    //==================================================
    // クレジット
    //==================================================

    Scene_Title.prototype.commandCredits = function() {

        DataManager.setupNewGame();

        // プレイヤー位置設定
        $gamePlayer.reserveTransfer(
            creditMapId,
            0,
            0,
            2,
            0
        );

        // マップ画面へ
        SceneManager.goto(Scene_Map);
    };

    //==================================================
    // 作者URL
    //==================================================

    Scene_Title.prototype.commandAuthorUrl = function() {

        // 新規タブで開く
        window.open(authorUrl, '_blank');

        this._commandWindow.activate();
    };

})();