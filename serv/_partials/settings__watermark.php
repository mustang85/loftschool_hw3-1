                <!--Настройки для одного вотермарка -->
                <div class="positioning__block block--coordinates">
                  <div class="positioning__visual">
                    <!--Визуальное отображение расположения вотермарка-->
                    <table class="visual__box">
                      <tbody class="box__body">
                        <tr class="box__row">
                          <td class="box__cell cell--active">
                            <button class="btn--cell js-set-cord" data-cord="11"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="12"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="13"></button>
                          </td>
                        </tr>
                        <tr class="box__row">
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="21"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="22"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="23"></button>
                          </td>
                        </tr>
                        <tr class="box__row">
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="31"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="32"></button>
                          </td>
                          <td class="box__cell">
                            <button class="btn--cell js-set-cord" data-cord="33"></button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div class="positioning__switch">
                    <div class="switch__block">
                      <p class="p p--big">X</p>
                      <input id="x-cord" class="form__input input--switch" type="text" name="xValue" value="0">
                      <div class="switch__controls">
                        <button data-direction="x-up" class="btn--up js-move-obj">Больше</button>
                        <button data-direction="x-down" class="btn--down js-move-obj">Меньше</button>
                      </div>
                    </div>
                    <div class="switch__block">
                      <p class="p p--big">Y</p>
                      <input id="y-cord" class="form__input input--switch" type="text" name="yValue" value="0">
                      <div class="switch__controls">
                        <button data-direction="y-up" class="btn--up js-move-obj">Больше</button>
                        <button data-direction="y-down" class="btn--down js-move-obj">Меньше	</button>
                      </div>
                    </div>
                  </div>
                </div>